package com.rgukt.edu.library.service;

import com.rgukt.edu.library.models.Users;
import com.rgukt.edu.library.repository.UsersRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    private final UsersRepo usersRepo;

    public UsersService(UsersRepo usersRepo){
        this.usersRepo=usersRepo;
    }

    public void registerUser(Users user){
        if(usersRepo.findByEmail(user.getEmail())!=null){
            throw new RuntimeException("Email already exists");
        }
        if(usersRepo.findById(user.getStudentId()).isPresent()){
            throw new RuntimeException("Student ID already exists");
        }
        user.setRole("STUDENT");
        usersRepo.save(user);
    }


    public List<Users> getAllUsers() {
        return usersRepo.findAll();
    }

    public Users authenticate(String email, String password) {
        Users user = usersRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
    public void removeAllUsers(){
        usersRepo.deleteAll();
    }
}
