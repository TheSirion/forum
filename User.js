class User {
  constructor(username, email, id, picture, auth_level = 1, age, gender, country) {
    this.username = username;
    this.email = email;
    this.id = id;
    this.picture = picture;
    this.sign_up_date = new Date();
    this.auth_level = auth_level;
    this.bio = '';
    this.age = age;
    this.gender = gender;
    this.country = country;
  }

  // the AuthLevel defines if the user is a normal forum member, a moderator or
  // an administrator. 1 = user; 2 = moderator; 3 = administrator. This is why 
  // it defaults to 0;
  setAuthLevel(level) {
    if (level > 0 && level < 4) {
      this.auth_level = level;
    }
  }

  // a small text describing the user or having any text the user wants.
  setbio(bio) {
    if (bio.length <= 1000) {
      this.bio = bio;
    }
  }

  // at first the picture will be whatever the API provides us,
  // so we don't need to worry about storing images. We can add
  // a feature to upload and change the profile picture later.
  setProfilePicture(picture) {
    this.picture = picture;
  }

}

class Moderator extends User {
  constructor() {
    super(username, email, id, picture, auth_level = 2, age, gender, country);
  }
}

class Administrator extends Moderator {
  constructor() {
    super(username, email, id, picture, auth_level = 3, age, gender, country);
  }
}