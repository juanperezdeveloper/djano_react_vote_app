"""testproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, re_path
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from mobile_app_api import views

urlpatterns = [
    # re_path(r'^getuser/(?P<email>\w+)/?$', views.getUser),
    path('getuser/<email>/<password>/', views.getUser, name="validate_email"),
    path('adduser/', views.addUser, name="customer_add"),
    path('addadminuser/', views.addAdminUser),
    path('getadminuser/', views.getAdminUser),
    path('getadminusers/', views.getAdminUsers),
    path('getshopdatas/', views.getShopDatas),
    path('admin/', admin.site.urls),
    path('shopdata/', views.manageShopData),
    path('', views.home),
    path('deleteadminuser/<id>', views.deleteAdminUser)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

