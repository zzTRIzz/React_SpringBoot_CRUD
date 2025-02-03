package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * The type User controller.
 */
@RestController
//@CrossOrigin(value = "http://localhost:3000")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {

    /**
     * The User service.
     */
    @Autowired
    UserService userService;

    /**
     * Get all users list.
     *
     * @return the list
     */
    @GetMapping("/user")
    public List<User> getAllUsers(){
        return userService.getAll();
    }

    /**
     * New user user.
     *
     * @param newUser the new user
     * @return the user
     */
    @PostMapping("/add")
    public User newUser(@RequestBody User newUser){
        return userService.save(newUser);
    }

    /**
     * Get user by id user.
     *
     * @param id the id
     * @return the user
     */
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Integer id){
        return userService.getUserById(id);
    }

    /**
     * Update user by id response entity.
     *
     * @param id   the id
     * @param user the user
     * @return the response entity
     */
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);

        existingUser.setUsername(user.getUsername());
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());

        User updatedUser = userService.save(existingUser); // Gọi phương thức update
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Delete response entity.
     *
     * @param id the id
     * @return the response entity
     */
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
