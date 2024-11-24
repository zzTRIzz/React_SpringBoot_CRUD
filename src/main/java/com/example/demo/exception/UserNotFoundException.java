package com.example.demo.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(Integer id){
        super("Không tìm thấy user với id : " + id);
    }
}
