package com.rgukt.edu.library.controller;

import com.rgukt.edu.library.models.Users;
import com.rgukt.edu.library.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UsersController {
    private final UsersService usersService;
    public UsersController(UsersService usersService){
        this.usersService=usersService;
    }

    @GetMapping("/")
    public String greet(){
        return "Hello";
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        try {
            usersService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "Registration successful!"));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage())); // JSON instead of plain text
        }
    }


    @GetMapping("/allusers")
    public List<Users> allUsers(){
        return usersService.getAllUsers();

    }


}
