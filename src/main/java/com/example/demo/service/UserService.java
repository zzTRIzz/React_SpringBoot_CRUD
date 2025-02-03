package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The type User service.
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * Get all list.
     *
     * @return the list
     */
    public List<User> getAll(){
        return userRepository.findAll();
    }

    /**
     * Save user.
     *
     * @param user the user
     * @return the user
     */
    public User save(User user){
        userRepository.save(user);
        return user;
    }

    /**
     * Delete by id.
     *
     * @param id the id
     */
    public void deleteById(Integer id){
        userRepository.deleteById(id);
    }

    /**
     * Get user by id user.
     *
     * @param id the id
     * @return the user
     */
    public User getUserById(Integer id){
        return userRepository.findById(id)
                .orElseThrow(() -> (new UserNotFoundException(id)));
    }

}
