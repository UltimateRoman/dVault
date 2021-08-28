pragma solidity >=0.5.0;

contract Dvault {

    uint public uCount;
    uint public cCount;
    mapping(uint => User) public users;
    mapping(uint => Certificate) public certificates;

    struct User {
        uint id;
        address userAddress;
        string name;
        string userType;
    }

    struct Certificate {
        uint id;
        string uid;
        string url;
        address issuer;
        address recipient;
        bool isValid;
        string desc;
    }

    function createUser(string memory _name, string memory _type) external {
        uCount++;
        users[uCount] = User(uCount, msg.sender, _name, _type);
    }

    function bytes32ToString(bytes32 _bytes32) private pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    function issueCertificate(string memory _url, address _recipient, string memory _desc) external returns(string memory) {
        require(bytes(_url).length > 0);
        require(bytes(_desc).length > 0);

        cCount++;
        string memory uid = bytes32ToString(keccak256(abi.encodePacked(cCount)));
        certificates[cCount] = Certificate(cCount, uid, _url, msg.sender, _recipient, true, _desc);
        return uid;
    }

    function verifyCertificate(string memory _uid) external view returns(bool) {
        bool valid = false;
        for(uint i=0; i <= cCount; ++i) {
            if(keccak256(abi.encodePacked(certificates[i].uid)) == keccak256(abi.encodePacked(_uid))) {
                valid = certificates[i].isValid;
            } 
        }
        return valid;
    }
}