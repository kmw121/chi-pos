package f2b2.Comma.domain.stack;


import f2b2.Comma.repository.PostStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostStackService {
    private final PostStackRepository postStackRepository;
    public void save(Long userId,Long stackId){
        postStackRepository.saveStack(userId,stackId);
    }
}

