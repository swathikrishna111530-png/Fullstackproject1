# from django.db import models
# from django.utils import timezone
# from datetime import timedelta

# # Create your models here.

# class Category(models.Model):
#     cname = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return self.cname

# class Book(models.Model):
#     title = models.CharField(max_length=200)
#     author = models.CharField(max_length=200)
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)

#     total_copies = models.PositiveIntegerField(default=5)
#     available_copies = models.PositiveIntegerField(default=5)

#     def __str__(self):
#         return self.title



# class Member(models.Model):

#     ROLE_CHOICES = [
#         ('admin', 'Admin'),
#         ('member', 'Member'),
#     ]

# class Member(models.Model):

#     ROLE_CHOICES = [
#         ('admin', 'Admin'),
#         ('member', 'Member'),
#     ]

#     GENDER_CHOICES = [
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ]

#     name = models.CharField(max_length=100)
#     age = models.PositiveIntegerField()
#     gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

#     phone = models.CharField(max_length=15, unique=True)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)

#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='member')
#     is_approved = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

#     def __str__(self):
#         return f"{self.name} ({self.role})"


# class BookRequest(models.Model):
#     member = models.ForeignKey(Member, on_delete=models.CASCADE)
#     book = models.ForeignKey(Book, on_delete=models.CASCADE)
#     requested_at = models.DateTimeField(auto_now_add=True)
#     approved = models.BooleanField(default=False)
#     returned = models.BooleanField(default=False)  # <-- add this

# def default_return_date():
#     return timezone.now() + timedelta(days=20)

# class IssuedBook(models.Model):
#     member = models.ForeignKey(Member, on_delete=models.CASCADE)
#     book = models.ForeignKey(Book, on_delete=models.CASCADE)
#     issued_at = models.DateTimeField(auto_now_add=True)
#     return_date = models.DateTimeField(default=default_return_date)  # use function
#     returned = models.BooleanField(default=False)
#     fine = models.DecimalField(max_digits=6, decimal_places=2, default=0)

#     def __str__(self):
#         return f"{self.book.title} issued to {self.member.name}"


# class DonatedBook(models.Model):
#     member = models.ForeignKey(Member, on_delete=models.CASCADE)
#     title = models.CharField(max_length=200)
#     author = models.CharField(max_length=200)
#     category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
#     total_copies = models.PositiveIntegerField(default=1)
#     submitted_at = models.DateTimeField(auto_now_add=True)
#     approved = models.BooleanField(default=False)  # Admin will approve

#     def __str__(self):
#         return f"{self.title} by {self.member.name} (Approved: {self.approved})"

from django.db import models
from django.utils import timezone
from datetime import timedelta

class Category(models.Model):
    cname = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.cname

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    total_copies = models.PositiveIntegerField(default=5)
    available_copies = models.PositiveIntegerField(default=5)
    image = models.ImageField(upload_to='book_images/', null=True, blank=True)
    def __str__(self):
        return self.title

class Member(models.Model):
    ROLE_CHOICES = [('admin', 'Admin'), ('member', 'Member')]
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='member')
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    def __str__(self):
        return f"{self.name} ({self.role})"

class BookRequest(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    requested_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    returned = models.BooleanField(default=False)

def default_return_date():
    return timezone.now() + timedelta(days=20)

class IssuedBook(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    issued_at = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(default=default_return_date)
    returned = models.BooleanField(default=False)
    fine = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    def __str__(self):
        return f"{self.book.title} issued to {self.member.name}"

class DonatedBook(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    total_copies = models.PositiveIntegerField(default=1)
    submitted_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    image = models.ImageField(upload_to='donated_books/', null=True, blank=True)  # ✅ add this
    def __str__(self):
        return f"{self.title} by {self.member.name} (Approved: {self.approved})"
    

class BookRating(models.Model):
    member_id = models.IntegerField()  # link to member
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)  # 1-5