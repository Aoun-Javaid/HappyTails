import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", '821|NVdhHjVG3jT6pZF5VspgOdzv5nCrqHeAWtKsMK8E')
  }

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  sendCategoryId(token: string) {
    localStorage.setItem("categoryId", token)
  }

  getCategoryId() {
    return localStorage.getItem("categoryId")
  }

  sendRole(role: string) {
    localStorage.setItem("LoggedInRole", role)
  }

  getRole() {
    return localStorage.getItem("LoggedInRole")
  }
  
  sendCityId(name: string) {
    localStorage.setItem("cityId", name)
  }

  getCityId() {
    return localStorage.getItem("cityId")
  }

  sendContactNo(name: string) {
    localStorage.setItem("contactNo", name)
  }

  getContactNo() {
    return localStorage.getItem("contactNo")
  }

  sendDukanName(name: string) {
    localStorage.setItem("dukanName", name)
  }

  getDukanName() {
    return localStorage.getItem("dukanName")
  }

  sendDukanBio(name: string) {
    localStorage.setItem("dukanBio", name)
  }

  getDukanBio() {
    return localStorage.getItem("dukanBio")
  }

  sendAddress(name: string) {
    localStorage.setItem("address", name)
  }

  getAddress() {
    return localStorage.getItem("address")
  }

  sendCity(name: string) {
    localStorage.setItem("city", name)
  }

  getCity() {
    return localStorage.getItem("city")
  }

  sendEmail(name: string) {
    localStorage.setItem("email", name)
  }
  
  getEmail() {
    return localStorage.getItem("email")
  }
  sendState(name: string) {
    localStorage.setItem("state", name)
  }
  
  getState() {
    return localStorage.getItem("state")
  }

  sendUserId(role: string) {
    localStorage.setItem("LoggedInUserId", role)
  }

  getFullName() {
    return localStorage.getItem("fullName")
  }

  sendFullName(role: string) {
    localStorage.setItem("fullName", role)
  }

  getUserId() {
    return localStorage.getItem("LoggedInUserId")
  }

  sendProfileImage(role: string) {
    localStorage.setItem("profileImage", role)
  }

  getProfileImage() {
    return localStorage.getItem("profileImage")
  }

  sendeWallet(role: any) {
    localStorage.setItem("eWallet", role)
  }

  geteWallet() {
    return localStorage.getItem("eWallet")
  }


  sendPendingEWallet(role: any) {
    localStorage.setItem("pendingEWallet", role)
  }

  getPendingEWallet() {
    return localStorage.getItem("pendingEWallet")
  }

  sendChatBool(role: any) {
    localStorage.setItem("chatBool", role)
  }

  getChatBool() {
    return localStorage.getItem("chatBool")
  }

  sendChatUserId(role: any) {
    localStorage.setItem("chatUserId", role)
  }

  getChatUserId() {
    return localStorage.getItem("chatUserId")
  }
  
  sendChatDukanName(role: any) {
    localStorage.setItem("chatDukanName", role)
  }

  getChatDukanName() {
    return localStorage.getItem("chatDukanName")
  }
  
  sendChatThumbnail(role: any) {
    localStorage.setItem("chatThumbnail", role)
  }

  getChatThumbnail() {
    return localStorage.getItem("chatThumbnail")
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.clear();
    this.myRoute.navigate(["home"]);
  }

}
