pragma solidity >=0.5.0;

contract Dvault {
    uint public ucount=0;
    mapping (uint => User) public users;
    struct User {
        uint id;
        address payable address;
        String name;
    }

    struct Certificate {
        uint id;
        String cid;
        address from_address;
        address to_address;
        String desc;
    }

    function certificate(uint _id, string memory _cid, String _desc) public {
        require(bytes(_cid).length > 0);
        require(bytes(_description).length > 0);
        ucount++;
        users[ucount] = User(_id, _cid, _name, false, msg.sender, _desc);
    }
}