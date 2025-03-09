package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
//@CrossOrigin(value = "http://localhost:3000")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {
    
    //triển khai các phương thức CRUD
    @Autowired
    UserService userService;
    @GetMapping("/user")
    public List<User> getAllUsers(){
        return userService.getAll();
    }

    @PostMapping("add")
    public User newUser(@RequestBody User newUser){
        return userService.save(newUser);
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Integer id){
        return userService.getUserById(id);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);

        existingUser.setUsername(user.getUsername());
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());

        User updatedUser = userService.save(existingUser); // Gọi phương thức update
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        userService.deleteById(id);
        String responseMessage = "{\"message\" : \"Đã xóa " + id + " thành công\"}";
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON) // Đặt loại nội dung
                .body(responseMessage);
    }











//    @PutMapping("/user/{id}")
//    public User updateUserById(@PathVariable Integer id,@RequestBody User user){
//        user.setId(id);
//        return userService.save(user);
//    }

}
