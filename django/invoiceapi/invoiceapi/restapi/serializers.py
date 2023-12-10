from rest_framework import serializers
from .models import Invoice, Items, User

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ["item_id","desc","quantity","rate"]

class InvoiceSerlializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    class Meta:
        model = Invoice
        fields = '__all__'


class UserSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
