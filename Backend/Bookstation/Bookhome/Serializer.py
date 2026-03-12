from rest_framework import serializers
from .models import Member,Book,Category,DonatedBook


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return value

from rest_framework import serializers
from .models import Book, Category

class BookSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.cname', read_only=True)
    image_url = serializers.SerializerMethodField()  # Add this field

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'category', 'category_name',
            'total_copies', 'available_copies', 'image', 'image_url'
        ]

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class DonatedBookSerializer(serializers.ModelSerializer):
    member_name = serializers.CharField(source='member.name', default='Unknown', read_only=True)
    category_name = serializers.CharField(source='category.cname', default='None', read_only=True)
    image_url = serializers.SerializerMethodField()  # ✅ add this

    class Meta:
        model = DonatedBook
        fields = ['id', 'member_name', 'title', 'author', 'category_name', 'total_copies', 'submitted_at', 'approved','image', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class DonatedBookApproveSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonatedBook
        fields = ['approved']

