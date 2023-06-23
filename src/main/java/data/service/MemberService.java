package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import data.dto.MemberDto;
import data.mapper.MemberMapper;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberService implements MemberServiceInter {

    private MemberMapper memberMapper;

    @Override
    public void deleteMember(int num) {
        memberMapper.deleteMember(num);
    }

    @Override
    public List<MemberDto> getAllMembers() {
        return memberMapper.getAllMembers();
    }

    @Override
    public int getLogin(String myid, String mypass) {
        Map<String, String> map = new HashMap<>();
        map.put("myid", myid);
        map.put("mypass", mypass);

        return memberMapper.getLogin(map);
    }

    @Override
    public String getName(String myid) {
        return memberMapper.getName(myid);
    }

    @Override
    public int getSearchId(String myid) {
        return memberMapper.getSearchId(myid);
    }

    @Override
    public void insertMember(MemberDto dto) {
        memberMapper.insertMember(dto);
    }

}
