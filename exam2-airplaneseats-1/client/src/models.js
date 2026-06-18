'use strict';

export function Seat(planeType, code, status, userID) {
    this.planeType = planeType;
    this.code = code;
    this.status = status;
    this.userID = userID;
}
  
export function User(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
}