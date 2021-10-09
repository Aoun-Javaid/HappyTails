import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
declare const $: any;
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ReuseFunctionService {
  show: boolean = false;
  showCP: boolean = false;
  showOP: boolean = false;
  isLoggedIn:any;
  imagePath: any = 'http://34.227.236.55/gahhak-backend-laravel-beta/storage/app/';


  Toast: any;
  constructor(private auth: AuthService,
    private route: Router) {
    this.isLoggedIn=this.auth.isLoggedIn();
  }

  /**
   * @description  This function is used for show/hide icon on any password field
   * @returns      return single password icon status in boolean`
   */
  passwordVisibility() {
    this.show = !this.show;
    return this.show;
    this.show = false;
  }

  errorShowSwal(text) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      showConfirmButton: false,
      timer: 4000,
    });
  }

  createTimeStamp() {
    // create Date object from valid string inputs
    var datetime = new Date();

    // format the output
    var month = datetime.getMonth() + 1;
    var day = datetime.getDate();
    var year = datetime.getFullYear();

    var hour = JSON.stringify(datetime.getHours());
    if (hour < '10') hour = '0' + hour;

    var min = JSON.stringify(datetime.getMinutes());
    if (min < '10') min = '0' + min;

    var sec = JSON.stringify(datetime.getSeconds());
    if (sec < '10') sec = '0' + sec;

    // put it all togeter
    var dateTimeString = month + day + year + hour + min + sec;

    return dateTimeString;
  }

  checkLoggedIn(){
    if(!this.isLoggedIn)
    {
      this.route.navigate(['/home']);
    }
  }

  successShowSwal(text) {
    Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 3000,
    });
  }

  getrandomNumber(numA, numB) {
    return (
      (Math.random() * (parseInt(numB) - parseInt(numA)) + parseInt(numA)) | 0
    );
  }

  /**
   * @description  This function is used for show/hide icon on confirm password field
   * @returns      return confirm password icon status in boolean`
   */
  passwordVisibilityConfirm() {
    this.showCP = !this.showCP;
    return this.showCP;
  }

  /**
   * @description  This function is used for show/hide icon on old password field
   * @returns      return old password icon status in boolean`
   * @
   */
  passwordVisibilityOld() {
    this.showOP = !this.showOP;
    return this.showOP;
  }

  /**
   * @description  This function is used to validate the password length
   * @param        e - the parameter for check length
   * @returns      return boolean if password lentgh meet the condition`
   */
  passwordValidationRegister(e) {
    if (e.length > 5 && e.length < 30) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description  This function is used to validate input value is just number
   * @param        e - the entered parameter for check decimal or not
   * @returns      return boolean if parameter is just number `
   */
  numberCheck(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  }

  numberCheckWithLength(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  }

  /**
   * @description  This function is used to validate input value is just number and get only one dot in input.
   * @param        e - the parameter for check decimal or not
   * @param        value - the parameter which contain hole string
   * @returns      return boolean if parameter is just number or have only one dot between numbers `
   */
  numberCheckWithDot(e, value) {
    if (
      e.which != 46 &&
      e.which != 8 &&
      e.which != 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else {
      if (e.which == 46) {
        if (value.includes(e.key)) {
          return false;
        }
      }
    }
  }

  /**
   * @description  This function is used to validate text fields.
   * @param        id - This parameter have an id of field
   * @param        name - This parameter have a name for show in error
   * @param        length - This parameter have a length of string of field
   * @param        min - This parameter have a min length of field
   * @param        max - This parameter have a max length of field
   * @returns      return boolean if any of condition meet
   */
  textTypeLength(id, name, length, min, max) {
    let msg = '';
    if (length == 0) {
      msg = name + ' is required.';
    } else if (length > max || length < min) {
      msg = 'The length should be ' + min + '-' + max + ' characters long.';
    } else {
      return false;
    }
    $(id).text(msg);
    return true;
  }
 

  strongPassword(id, name, value, min, max) {
    let msg = '';
    var patt = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}/;
    if (value.length == 0) {
      msg = name + ' is required.';
    } else if (value.length > max || value.length < min) {
      msg = 'The length should be ' + min + '-' + max + ' characters long.';
    } else if (!patt.test(value)) {
      msg = 'Password must match the format (eg: Hello123$) ';
    } else {
      return false;
    }  

    $(id).text(msg);
    return true;
  }
  onlyTextLength(id, name, length, max) {
    let msg = '';
    if (length > max) {
      msg = 'The ' + name + ' should be less than' + max + ' characters.';
    } else {
      return false;
    }
    $(id).text(msg);
    return true;
  }

  confirmPasswordValidator(id, name, password, confirmPassword) {
    let msg = '';
    if (confirmPassword.length == 0) {
      msg = name + ' is required.';
    } else if (password != confirmPassword) {
      msg = 'The confirm password field didnot match.';
    } else {
      return false;
    }
    $(id).text(msg);
    return true;
  }
  /**
   * @description  This function is used to validate number fields
   * @param        id - This parameter have an id of field
   * @param        name - This parameter have a name for show in error
   * @param        value - This parameter is optional
   * @param        length - This parameter have a length of string of field
   * @param        min - This parameter have a min length of field
   * @param        max - This parameter have a max length of field
   * @returns      return boolean if any of condition meet
   */
  textTypeLengthNumber(id, name, length, min, max) {
    let msg = '';

    if (length == 0) {
      msg = 'The ' + name + ' field is required.';
    } else if (length > max || length < min) {
      msg = 'The number should be less than ' +max+'.';
    } else {
      return false;
    }

    $(id).text(msg);
    return true;
  }

  textTypeLengthPhoneNumber(id, name, length, min, max) {
    let msg = '';

    if (length == 0) {
      msg = 'The ' + name + ' field is required.';
    } else if (length > max || length < min) {
      msg = 'The number should be of 11 digits.';
    } else {
      return false;
    }

    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to validate number fields and show different error message.
   * @param        id - This parameter have an id of field
   * @param        name - This parameter have a name for show in error
   * @param        length - This parameter have a length of string of field
   * @param        min - This parameter have a min length of field
   * @param        max - This parameter have a max length of field
   * @returns      return boolean if any of condition meet
   */
  numberTypeLength(id, name, length, min, max) {
    let msg = '';
    if (length == 0) {
      msg = 'The ' + name + ' field is required.';
    } else if (length > max || length < min) {
      msg = 'The length should be ' + min + '-' + max + ' digits long.';
    } else {
      return false;
    }

    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to validate entered value start with decimal and just have one dot between decimals
   * @param        id - This parameter have an id of field
   * @param        name - This parameter is optional
   * @param        value - This parameter have an entered value
   * @param        min - This parameter have a min length of field
   * @param        max - This parameter have a max length of field
   * @returns      return boolean if any of condition meet
   */
  digitValidation(id, name, value, min, max) {
    let msg = '';
    var patt = new RegExp('^[0-9]+(.[0-9]{0,2})?$');

    if (value == '' || value == undefined || value == null) {
      msg = 'Field required.';
    } else if (value > max || value < min) {
      msg = 'Allowed range is ' + min + '-' + max + '.';
    } else if (!patt.test(value)) {
      msg = 'Only digits are allowed.';
    } else {
      return false;
    }

    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to validate entered value start with decimal
   * @param        id - This parameter have an id of field
   * @param        name - This parameter is optional
   * @param        value - This parameter have an entered value
   * @param        min - This parameter have a min length of field
   * @param        max - This parameter have a max length of field
   * @returns      return boolean if any of condition meet
   */
  digitValidation2(id, name, value, min, max) {
    let msg = '';
    var patt = new RegExp('^[0-9]*$');

    if (value == '' || value == undefined || value == null) {
      msg = 'Required.';
    } else if (value > max || value < min) {
      msg = 'Limit ' + min + ' to ' + max;
    } else if (!patt.test(value)) {
      msg = 'Only digits are allowed.';
    } else {
      return false;
    }

    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to validate text fields and show different error message for small fields.
   * @param        id - This parameter have an id of field
   * @param        name - This parameter have a name for show in error
   * @param        length - This parameter have a length of string of field
   * @param        min - This parameter have a min length of field
   * @param        max - This parameter have a max length of field
   * @returns      return boolean if any of condition meet
   */
  testMethodsTextLength(id, name, length, min, max) {
    let msg = '';
    if (length == 0) {
      msg = 'Field required.';
    } else if (length > max || length < min) {
      msg = 'Limit ' + min + '-' + max;
    } else {
      return false;
    }

    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to validate postal code format
   * @param        id - This parameter have an id of field
   * @param        name - This parameter have a name for show in error
   * @param        str - This parameter have a string for test
   * @returns      return boolean if any of condition meet
   */
  postalCodeFormat(id, name, str) {
    let msg = '';
    let count = 0;
    if (str != '') {
      for (let i = 0; i < 17; i++) {
        if (str[i] == '_') count++;
      }
      if (str == '' || str == undefined || str == null) {
        msg = 'The ' + name + ' field is required.';
      } else if (count == 11) {
        msg = 'The ' + name + ' field is required.';
      } else if (count > 0 && count < 11) {
        msg = 'The ' + name + ' format is invalid.';
      } else {
        return false;
      }
    } else {
      msg = 'The ' + name + ' field is required.';
    }

    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to validate email format
   * @param        id - This parameter have an id of field
   * @param        email - This parameter have an entered  email for test
   * @returns      return boolean if any of condition meet
   */
  emailType(id, email) {
    let msg = '';
    var patt =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.spaceCheck(email)) {
      if (email == '' || email == undefined || email == null) {
        msg = 'Email is required.';
      } else if (email.length > 50 || email.length < 1) {
        msg = 'Length should be 1-50 characters long.';
      } else if (!patt.test(email)) {
        msg = 'Please enter valid email address.';
      } else {
        return false;
      }
    } else {
      msg = 'Email is required.';
    }

    $(id).text(msg);
    return true;
  }

  speedCheck(id, speed, numberOfSpeeds) {
    let msg = '';
    var patt;
    if (numberOfSpeeds == 2) {
      patt = /^[0-9]+,[0-9]+$/;
    } else if (numberOfSpeeds == 3) {
      patt = /^[0-9]+,[0-9]+,[0-9]+$/;
    } else {
      patt = /^[0-9]+,[0-9]+,[0-9]+,[0-9]+$/;
    }
    if (this.spaceCheck(speed)) {
      if (speed == '' || speed == undefined || speed == null) {
        msg = 'The speed field is required.';
      } else if (!patt.test(speed)) {
        msg = 'Invalid Pattern';
      } else {
        return false;
      }
    } else {
      msg = 'The field is required.';
    }

    $(id).text(msg);
    return true;
  }

  checkRange(id, value) {
    let msg = '';
    var patt = /^-?[0-9]+,-?[0-9]+$/;

    if (this.spaceCheck(value)) {
      if (value == '' || value == undefined || value == null) {
        msg = 'The value field is required.';
      } else if (!patt.test(value)) {
        msg = 'Invalid Pattern';
      } else {
        return false;
      }
    } else {
      msg = 'The field is required.';
    }

    $(id).text(msg);
    return true;
  }

  checkArray(id, value) {
    let msg = '';
    var patt = /^-?[0-9]*(,-?[0-9]+)*$/;

    if (this.spaceCheck(value)) {
      if (value == '' || value == undefined || value == null) {
        msg = 'The value field is required.';
      } else if (!patt.test(value)) {
        msg = 'Invalid Pattern';
      } else  {
        return false;
      }
    } else {
      msg = 'The field is required.';
    }

    $(id).text(msg);
    return true;
  }

  characterPatternType(id, name, value, min, max) {
    let msg = '';
    if (this.spaceCheck(value)) {
      if (value == '' || value == undefined || value == null) {
        msg = 'The ' + name + ' field is required.';
      } else if (value.length < min || value.length > max) {
        msg = 'The length should be ' + min + '-' + max + ' characters long.';
      } else {
        return false;
      }
    } else {
      msg = 'The ' + name + ' field is required.';
    }

    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to validate value selected from dropdown or not
   * @param        id - This parameter have an id of field
   * @param        name - This parameter have a name for show in error
   * @param        value - This parameter have an entered value from dropdown
   * @returns      return boolean if any of condition meet
   */
  checkEmpty(id, name, value) {
    let msg = '';

    if (value == '' || value == undefined || value == null) {
      msg = 'Select at least one ' + name + '.';
    } else {
      return false;
    }

    $(id).text(msg);
    return true;
  }



  /**
   * @description  This function is used to remove the extra spaces from strin
   * @param        value - This parameter have an entered string
   * @returns      return counterSpace string after remove extra spaces
   */
  spaceCheck(value) {
    let whiteSpacemassMessage = value;
    let temp = value;

    whiteSpacemassMessage = whiteSpacemassMessage.split(' ').join('');
    let counterSpace = false;
    for (let i = 0; i < value.length; i++) {
      if (temp.charAt(i) != ' ' && temp.charAt(i) != '\n') {
        counterSpace = true;
        break;
      }
    }

    return counterSpace;
  }

  /**
   * @description  This function is used to validate all show error in modal
   * @param        id - This parameter is optional
   * @param        name - This parameter is optional
   * @param        value - This parameter have an entered value of field
   * @param        min - This parameter have a min length of field
   * @param        max - This parameter have a max length of field
   * @returns      return boolean and also show error modal
   */
  inlineListCheck(id, name, value, min, max) {
    let msg = '';
    if (value == '' || value == undefined || value == null) {
      return true;
    } else if (value.length < min || value.length > max) {
      msg = 'The length should be ' + min + '-' + max + ' characters long.';
    } else {
      return false;
    }
    // this.errorShowSwal(msg);
    return true;
  }

  /**
   * @description  This function is used to convert utc date to local date in desired format
   * @param        old - This parameter have utc date
   * @returns      return date in local format
   */
  getLocalDate(old) {
    let newDate = new Date(old);
    let dd = newDate.getDate();

    let mm = newDate.getMonth() + 1;
    const yyyy = newDate.getFullYear();

    let day: any;
    let month: any;
    if (dd < 10) {
      day = '0' + dd;
    } else {
      day = dd;
    }

    if (mm < 10) {
      month = '0' + mm;
    } else {
      month = mm;
    }
    let dateA = '';
    dateA = yyyy + '-' + month + '-' + day;

    return dateA;
  }

  /**
   * @description  This function is used to validate date field
   * @param        id - This parameter have an id of field
   * @param        name - This parameter have a name for show in error
   * @param        value - This parameter have an entered date
   * @returns      return boolean if condition meet or not
   */
  checkDate(id, name, value) {
    let msg = '';
    if (value == '' || value == undefined || value == null) {
      msg = name + ' required.';
    } else {
      return false;
    }
    $(id).text(msg);
    return true;
  }

  /**
   * @description  This function is used to convert utc dateTime to local dateTime in desired format
   * @param        old - This parameter have utc date
   * @returns      return dateTime  in local format
   */
  getLocalDateTime() {
    let newDate = new Date();
    let dd = newDate.getDate();
    let mm = newDate.getMonth() + 1;
    const yyyy = newDate.getFullYear();
    let hours = newDate.getHours();
    let minute = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    let h: any;
    let m: any;
    let s: any;
    if (hours < 10) {
      h = '0' + hours;
    } else {
      h = hours;
    }
    if (minute < 10) {
      m = '0' + minute;
    } else {
      m = minute;
    }
    if (seconds < 10) {
      s = '0' + seconds;
    } else {
      s = seconds;
    }

    let day: any;
    let month: any;
    if (dd < 10) {
      day = '0' + dd;
    } else {
      day = dd;
    }
    if (mm < 10) {
      month = '0' + mm;
    } else {
      month = mm;
    }
    let dateA = '';
    dateA = yyyy + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
    return dateA;
  }
}
