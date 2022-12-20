package f2b2.Comma.domain.stack;

import f2b2.Comma.repository.UserStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserStackService {
    private final UserStackRepository userStackRepository;

    public void save(Long userId,Long stackId){
        userStackRepository.saveStack(userId,stackId);
    }
}
