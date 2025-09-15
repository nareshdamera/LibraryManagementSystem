package com.rgukt.edu.library.controller;

import com.rgukt.edu.library.models.Users;
import com.rgukt.edu.library.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Users user = usersService.authenticate(email, password);
        if (user != null) {
            session.setAttribute("userId", user.getUserId());
            session.setAttribute("email", user.getEmail());
            session.setAttribute("role", user.getRole());
            Map<String, Object> response = Map.of(
                    "message", "Login successful",
                    "user", Map.of(
                            "name", user.getName(),
                            "email", user.getEmail(),
                            "role", user.getRole()
                    )
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }
    }



    @GetMapping("/allusers")
    public List<Users> allUsers(){
        return usersService.getAllUsers();

    }


}
