from rest_framework import serializers
from .models import Invoice, Items,User
from django.contrib.auth import authenticate

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = '__all__'

class InvoiceSerlializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    class Meta:
        model = Invoice
        fields = '__all__'


# class UserSerilaizer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
class UserSerializer(serializers.ModelSerializer): 
      password = serializers.CharField(write_only=True)

      class Meta:
         model = User
         fields = ("name","email","password")
      def create(self, validated_data):
          user = User.objects.create_user(
          name=validated_data['name'],
          email=validated_data['email'],
          password=validated_data['password']
            )
          return user
         
class LoginSerializer (serializers.Serializer):
      email=serializers.CharField()
      password=serializers.CharField()
      def validate(self, data):
          user = authenticate(**data)
          if user and user.is_active: 
              return user
          raise serializers.ValidationError("Incorrect cred")