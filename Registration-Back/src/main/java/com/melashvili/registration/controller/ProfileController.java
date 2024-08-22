package com.melashvili.registration.controller;

import com.melashvili.registration.model.dto.response.UserResponseDTO;
import com.melashvili.registration.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/profile")
public class ProfileController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getProfile(@PathVariable Long id) {
        UserResponseDTO user = userService.getUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/byEmail")
    public ResponseEntity<UserResponseDTO> getProfileByEmail(@RequestParam String email) {
        UserResponseDTO user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
