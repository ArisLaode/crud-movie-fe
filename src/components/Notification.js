import 'antd/dist/antd.min.css'
import '../index.css'
import { notification } from 'antd'


const getNotificationStyle = type => {
  return {
    success: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #b7eb8f',
      backgroundColor: '#f6ffed',
    },
    error: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #ffa39e',
      backgroundColor: '#fff1f0'
    }
  }[type]
}

export const notifError = (type) => {
  notification[type]({
    message: "Error, check your input!",
    style: getNotificationStyle(type),
  });
 
}

export const NotifLoginSuccess = (type, messageAPI) => {
  notification[type]({
    message: `${messageAPI}`,
    style: getNotificationStyle(type),
  });
  setTimeout(function(){
    window.location.reload();
 }, 1100);
}

export const NotifError = (type, messageAPI) => {
  notification[type]({
    message: `${messageAPI}`,
    style: getNotificationStyle(type),
  });
}

export const NotifSuccess = (type, messageAPI) => {
  notification[type]({
    message: `${messageAPI}`,
    style: getNotificationStyle(type),
  });
}

export const NotifUpdateSuccess = (type, messageAPI) => {
  notification[type]({
    message: `${messageAPI}`,
    style: getNotificationStyle(type),
  });
  setTimeout(function(){
    window.location.reload();
 }, 1100);
}

export const NotifDeleteSuccess = (type) => {
  notification[type]({
    message: "Delete Success",
    style: getNotificationStyle(type),
  });
  setTimeout(function(){
    window.location.reload();
 }, 1100);
}