package com.melashvili.registration.services;

import com.melashvili.registration.model.dto.request.AuthenticationRequest;
import com.melashvili.registration.model.dto.request.RegisterRequest;
import com.melashvili.registration.model.dto.response.AuthenticationResponse;
import com.melashvili.registration.model.entities.User;
import com.melashvili.registration.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.security.auth.login.AccountException;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.time.Duration;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws IOException, AccountException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("403 Forbidden - Unauthorized Access");
        }

        User emailChecker = userRepository.findByEmail(request.getEmail());

        if (emailChecker != null) {
            throw new AccountException("An account with this email already exists.");
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .image(convertImageToPng(Base64.getDecoder().decode(request.getImageBase64())))
                .build();
        userRepository.save(user);
        var token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .cookie(createAuthTokenCookie(token))
                .build();
    }

    private byte[] convertImageToPng(byte[] imageBytes) {
        try {
            ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
            BufferedImage originalImage = ImageIO.read(inputStream);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(originalImage, "png", outputStream);

            return outputStream.toByteArray();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new UsernameNotFoundException("Invalid email or password");
        }

        var token = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .cookie(createAuthTokenCookie(token))
                .build();
    }

    public String createAuthTokenCookie(String token) {
        ResponseCookie cookie = ResponseCookie.from("authToken", token)
                .httpOnly(true) // to prevent javascript access
                .secure(false)   // use true if your site uses https
                .path("/")      // cookie available for all paths
                .maxAge(Duration.ofDays(1)) // cookie expiration time
                .sameSite("Strict") // to prevent csrf
                .build();
        return cookie.toString();
    }
}
