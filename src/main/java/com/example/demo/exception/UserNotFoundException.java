package com.example.demo.exception;

/**
 * The type User not found exception.
 */
public class UserNotFoundException extends RuntimeException{

    /**
     * Instantiates a new User not found exception.
     *
     * @param id the id
     */
    public UserNotFoundException(Integer id){
        super("Không tìm thấy user với id : " + id);
    }
}
