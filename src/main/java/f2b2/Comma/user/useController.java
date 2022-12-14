package f2b2.Comma.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class useController {

    private final UserService userService;

    @GetMapping("/api/user")
    public User test2(){
        return userService.find(1L);
    }
}
