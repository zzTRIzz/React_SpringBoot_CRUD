package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

/**
 * The type User not found advice.
 */
@ControllerAdvice
public class UserNotFoundAdvice extends RuntimeException{

    /**
     * Exception handler map.
     *
     * @param userNotFoundException the user not found exception
     * @return the map
     */
    @ResponseBody
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> exceptionHandler(UserNotFoundException userNotFoundException){

        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("errorMessage",userNotFoundException.getMessage());
        return errorMap;
    }
}
