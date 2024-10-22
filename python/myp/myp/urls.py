# blog/urls.py
from django.urls import path
from blog.views import PostListCreate, PostDetail
from rest_framework.authtoken import views
urlpatterns = [
    path('api/posts/', PostListCreate.as_view(), name='post_list_create'),
    path('api/posts/<int:pk>/', PostDetail.as_view(), name='post_detail'),
        path('api-token-auth/', views.obtain_auth_token),
    ]
