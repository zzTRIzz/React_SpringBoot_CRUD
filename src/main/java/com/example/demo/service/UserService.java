package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User save(User user){
        userRepository.save(user);
        return user;
    }
    public void deleteById(Integer id){
        userRepository.deleteById(id);
    }
    public User getUserById(Integer id){
        return userRepository.findById(id)
                .orElseThrow(() -> (new UserNotFoundException(id)));
    }

}
