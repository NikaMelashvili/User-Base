package com.melashvili.registration.services;

import com.melashvili.registration.model.dto.response.UserResponseDTO;
import com.melashvili.registration.model.entities.User;
import com.melashvili.registration.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDTO getUser(Long id) {
        User user = userRepository.getReferenceById(id);

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setId(user.getId());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setProfilePicture(user.getImage().toString());

        return userResponseDTO;
    }

    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setId(user.getId());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setProfilePicture(Base64.getEncoder().encodeToString(user.getImage()));

        return userResponseDTO;
    }
}
