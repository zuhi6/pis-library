let UserProfile = (function() {
    let full_name = "";
    let points = 0;
    let id = 0; 
    let role = "";
  
    let getName = function() {
        return full_name;    // Or pull this from cookie/localStorage
    };
  
    let setName = function(name) {
        full_name = name;     
      // Also set this in cookie/localStorage
    };
    let getPoints = function() {
        return points;    // Or pull this from cookie/localStorage
    };
    
    let setPoints = function(_points) {
        points = _points;     
        // Also set this in cookie/localStorage
    };
    let getId = function() {
        return id;    // Or pull this from cookie/localStorage
    };
    
    let setId = function(_id) {
        id = _id;     
        // Also set this in cookie/localStorage
    };
    let getRole = function() {
        return role;    // Or pull this from cookie/localStorage
    };
  
    let setRole = function(_role) {
        role = _role;     
      // Also set this in cookie/localStorage
    };
    

    return {
      getName: getName,
      setName: setName,
      getId: getId,
      setId: setId,
      getPoints: getPoints,
      setPoints: setPoints,
      getRole: getRole,
      setRole: setRole
    }
  
  })();
  
  export default UserProfile;