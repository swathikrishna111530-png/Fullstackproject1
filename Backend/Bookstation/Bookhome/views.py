from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .Serializer import BookSerializer,CategorySerializer, MemberSerializer,DonatedBookSerializer,DonatedBookApproveSerializer
from rest_framework.permissions import IsAdminUser
from .models import Member, Book,Category,BookRequest,IssuedBook,DonatedBook,BookRating
from datetime import timedelta




# Create your views here.
@api_view(['GET'])
def hello(request):
    return Response({'message':'hello python'})

@api_view(['POST'])
def register(request):
    serializer = MemberSerializer(data=request.data)

    if serializer.is_valid():
        member = serializer.save()

        # Auto-approve admin
        if member.role == "admin":
            member.is_approved = True
            member.save()

        return Response(
            {"message": "Registration successful ✅"},
            status=status.HTTP_201_CREATED
        )

    # Return all validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    user = Member.objects.filter(email=email).first()
    if not user:
        return Response({"error": "User not found"}, status=404)

    if user.password != password:
        return Response({"error": "Invalid password"}, status=400)

    if user.role == "member" and not user.is_approved:
        return Response({"error": "Your account is not approved by admin yet"}, status=403)

    return Response({
        "message": f"{user.role.capitalize()} login successful",
        "user_id": user.id,
        "role": user.role,
        "name": user.name
    })


@api_view(['POST'])
def approve_member(request, member_id):
    admin_id = request.data.get("id")
    admin = Member.objects.filter(id=admin_id, role="admin").first()
    if not admin:
        return Response({"error": "Only admin can approve members"}, status=403)

    member = Member.objects.filter(id=member_id, role="member").first()
    if not member:
        return Response({"error": "Member not found"}, status=404)

    if member.is_approved:
        return Response({"message": "Member already approved"}, status=200)

    member.is_approved = True
    member.save()
    return Response({"message": "Member approved successfully"}, status=200)

@api_view(['GET'])
def approved_members(request):
    members = Member.objects.filter(role="member", is_approved=True)
    data = [{"id": m.id, "name": m.name, "email": m.email, "phone": m.phone} for m in members]
    return Response(data)

@api_view(['GET'])
def pending_members(request):
    members = Member.objects.filter(role="member", is_approved=False)
    data = [{"id": m.id, "name": m.name, "email": m.email, "phone": m.phone} for m in members]
    return Response(data)


@api_view(['POST'])
def add_category(request):

    user_id = request.data.get('user_id')

    user = Member.objects.filter(id=user_id, role="admin").first()

    if not user:
        return Response({"error": "Only admin can add category"})

    serializer = CategorySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Category added successfully"})

    return Response(serializer.errors)


@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    data = [{"id": cat.id, "cname": cat.cname} for cat in categories]
    return Response(data)

@api_view(['GET'])
def categories(request):
    data = [{"id": c.id, "name": c.cname} for c in Category.objects.all()]
    return Response(data)



@api_view(['POST'])
def add_book(request):
    user_id = request.data.get("user_id")
    admin = Member.objects.filter(id=user_id, role="admin").first()
    if not admin:
        return Response({"error": "Admin not logged in"}, status=401)

    title = request.data.get("title")
    author = request.data.get("author")
    category_id = request.data.get("category")
    total_copies = request.data.get("total_copies", 5)
    available_copies = request.data.get("available_copies", total_copies)
    image = request.FILES.get("image")  # get the uploaded file

    if not title or not author or not category_id:
        return Response({"error": "Title, author, and category are required"}, status=400)

    category = Category.objects.filter(id=category_id).first()
    if not category:
        return Response({"error": "Category not found"}, status=404)

    book = Book.objects.create(
        title=title,
        author=author,
        category=category,
        total_copies=int(total_copies),
        available_copies=int(available_copies),
        image=image  # save the uploaded file
    )

    serializer = BookSerializer(book, context={'request': request})
    return Response({
    "message": "Book added successfully",
    "data": serializer.data
})





from django.db.models import Avg
@api_view(['GET'])
def list_books(request):
    books = Book.objects.all()
    donated_books = DonatedBook.objects.filter(approved=True)

    data = []

    # Normal books
    for b in books:
        avg_rating = BookRating.objects.filter(book_id=b.id).aggregate(Avg('rating'))['rating__avg']
        data.append({
            "id": b.id,
            "title": b.title,
            "author": b.author,
            "category": b.category.cname if b.category else "",
            "category_id": b.category.id if b.category else "",
            "total_copies": b.total_copies,
            "available_copies": b.available_copies,
            "image_url": request.build_absolute_uri(b.image.url) if b.image else None,
            "avg_rating": round(avg_rating,1) if avg_rating else 0
            
        })

    # Donated books
    for d in donated_books:
        data.append({
            "id": f"d{d.id}",  # keep string ID
            "title": d.title,
            "author": d.author,
            "category": d.category.cname if d.category else "",
            "category_id": d.category.id if d.category else "",
            "total_copies": d.total_copies,
            "available_copies": d.total_copies,
            "image_url": request.build_absolute_uri(d.image.url) if d.image else None
        })

    return Response(data)





@api_view(['DELETE'])
def delete_book(request, book_id):

    # If donated book (starts with d)
    if str(book_id).startswith("d"):
        real_id = str(book_id)[1:]   # remove 'd'

        donated = DonatedBook.objects.filter(id=real_id, approved=True).first()

        if donated:
            donated.delete()
            return Response({"message": "Donated book deleted successfully"})

    else:
        book = Book.objects.filter(id=book_id).first()

        if book:
            book.delete()
            return Response({"message": "Admin book deleted successfully"})

    return Response({"error": "Book not found"}, status=404)



@api_view(['PUT'])
def update_book(request, book_id):

    data = request.data

    # Admin book
    book = Book.objects.filter(id=book_id).first()

    if book:
        book.title = data.get("title")
        book.author = data.get("author")
        book.category_id = data.get("category")
        book.total_copies = data.get("total_copies")
        book.available_copies = data.get("available_copies")

        book.save()

        return Response({"message": "Admin book updated successfully"})

    # Donated book
    donated = DonatedBook.objects.filter(id=book_id, approved=True).first()

    if donated:
        donated.title = data.get("title")
        donated.author = data.get("author")
        donated.category_id = data.get("category")
        donated.total_copies = data.get("total_copies")

        donated.save()

        return Response({"message": "Donated book updated successfully"})

    return Response({"error": "Book not found"}, status=404)

@api_view(['POST'])
def request_book(request):
    member_id = request.data.get("member_id")
    book_id = request.data.get("book_id")

    # Validate input
    if not member_id or not book_id:
        return Response({"error": "Member ID and Book ID required"}, status=400)

    # Check member exists
    member = Member.objects.filter(id=member_id).first()
    if not member:
        return Response({"error": "Member not found"}, status=404)

    # Check book exists
    book = Book.objects.filter(id=book_id).first()
    if not book:
        return Response({"error": "Book not found"}, status=404)

    # Check available copies
    if book.available_copies <= 0:
        return Response({"error": "No copies available"}, status=400)

    # Create request
    BookRequest.objects.create(member=member, book=book)

    return Response({"message": "Request sent to admin"}, status=201)



@api_view(['POST'])
def approve_request(request):
    request_id = request.data.get("request_id")

    if not request_id:
        return Response({"error": "Request ID required"}, status=400)

    book_request = BookRequest.objects.filter(id=request_id, status="pending").first()

    if not book_request:
        return Response({"error": "Request not found or already processed"}, status=404)

    book = book_request.book

    if book.available_copies <= 0:
        return Response({"error": "No copies available"}, status=400)

    # Reduce available copies
    book.available_copies -= 1
    book.save()

    # Update request status
    book_request.status = "approved"
    book_request.save()

    return Response({"message": "Book issued successfully"})

@api_view(['GET'])
def pending_requests(request):
    pending = BookRequest.objects.filter(approved=False)
    data = []
    for r in pending:
        data.append({
            "request_id": r.id,
            "book_id": r.book.id,
            "member_id": r.member.id,
            "book_title": r.book.title,
            "member_name": r.member.name,
            "requested_at": r.requested_at,
            "available_copies": r.book.available_copies,
        })
    return Response(data)


@api_view(['POST'])
def issue_book(request):
    member_id = request.data.get('member_id')
    book_id = request.data.get('book_id')

    if not member_id or not book_id:
        return Response({"error": "member_id and book_id are required"}, status=400)

    book = Book.objects.filter(id=book_id).first()
    member = Member.objects.filter(id=member_id).first()

    if not book or not member:
        return Response({"error": "Book or Member not found"}, status=404)

    if book.available_copies < 1:
        return Response({"error": "No available copies"}, status=400)

    if IssuedBook.objects.filter(member=member, book=book, returned=False).exists():
        return Response({"error": "Book already issued"}, status=400)

    # Issue the book
    issued = IssuedBook.objects.create(member=member, book=book)
    book.available_copies -= 1
    book.save()

    # ✅ Remove the pending request to clear it from admin view
    BookRequest.objects.filter(member=member, book=book, approved=False).delete()

    return Response({
        "message": f"Book '{book.title}' issued successfully!",
        "issued_at": issued.issued_at,
        "return_date": issued.return_date
    })



from datetime import timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def my_books(request, member_id):

    issued_books = IssuedBook.objects.filter(member_id=member_id, returned=False)

    data = []

    for issued in issued_books:
        data.append({
            "book_id": issued.book.id,
            "title": issued.book.title,
            "author": issued.book.author.name if hasattr(issued.book.author, "name") else issued.book.author,
            "category": issued.book.category.cname if issued.book.category else "",
            "issued_at": issued.issued_at,
            "return_date": issued.return_date,
            "available_copies": issued.book.available_copies
        })

    return Response(data)







from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
def return_book(request):
    member_id = request.data.get('member_id')
    book_id = request.data.get('book_id')

    if not member_id or not book_id:
        return Response({"error": "member_id and book_id are required"}, status=400)

    issued = IssuedBook.objects.filter(
        member_id=member_id,
        book_id=book_id,
        returned=False
    ).first()

    if not issued:
        return Response({"error": "This book is not currently issued to this member"}, status=404)

    issued.returned = True
    issued.save()

    book = issued.book
    book.available_copies += 1
    book.save()

    return Response({"message": f"Book '{book.title}' returned successfully!"})

@api_view(['POST'])
def logout_user(request):
    return Response({"message": "Logout successful"})

@api_view(['POST'])
def donate_book(request):
    user_id = request.data.get("member")

    if not user_id:
        return Response({'error': 'Member ID is required'}, status=400)

    member = Member.objects.get(id=user_id)

    serializer = DonatedBookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(member=member)
        return Response({'message': 'Book donation submitted successfully!'}, status=201)

    return Response(serializer.errors, status=400)




@api_view(['GET'])
def pending_donated_books(request):
    pending_books = DonatedBook.objects.filter(approved=False)
    serializer = DonatedBookSerializer(pending_books, many=True, context={'request': request})
    return Response(serializer.data)

from django.shortcuts import get_object_or_404
@api_view(['PATCH'])
def approve_donated_book(request, book_id):  # <-- must include book_id here
    """
    Approve a donated book by setting approved=True
    """
    book = get_object_or_404(DonatedBook, id=book_id)

    if book.approved:
        return Response({'error': 'Book is already approved'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = DonatedBookApproveSerializer(book, data={'approved': True}, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': f'Book "{book.title}" approved successfully'})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def approved_donated_books(request):
    books = DonatedBook.objects.filter(approved=True)
    serializer = DonatedBookSerializer(books, many=True)
    return Response(serializer.data)





@csrf_exempt
@api_view(['POST'])
def rate_book(request):

    member_id = request.data.get("member_id")
    book_id = request.data.get("book_id")
    rating = request.data.get("rating")

    book = Book.objects.get(id=book_id)

    rating_obj = BookRating.objects.filter(member_id=member_id, book=book).first()

    if rating_obj:
        rating_obj.rating = rating
        rating_obj.save()
        return Response({"message": "Rating updated"})
    else:
        BookRating.objects.create(
            member_id=member_id,
            book=book,
            rating=rating
        )
        return Response({"message": "Rating submitted"})




@api_view(['GET'])
def book_detail(request, pk):
    """
    Return details of a single book by ID (or donated book if prefixed with 'd').
    No try-except; uses get_object_or_404.
    """
    if str(pk).startswith("d"):  # Donated book
        donated_id = str(pk)[1:]  # remove 'd' prefix
        book = get_object_or_404(DonatedBook, id=donated_id, approved=True)
        data = {
            "id": f"d{book.id}",
            "title": book.title,
            "author": book.author,
            "category": book.category.cname if book.category else "",
            "total_copies": book.total_copies,
            "available_copies": book.total_copies,
            # "image_url": request.build_absolute_uri(book.image.url) if book.image else None
        }
    else:  # Regular book
        book = get_object_or_404(Book, id=pk)
        data = {
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "category": book.category.cname if book.category else "",
            "total_copies": book.total_copies,
            "available_copies": book.available_copies,
            "image_url": request.build_absolute_uri(book.image.url) if book.image else None
        }

    return Response(data)