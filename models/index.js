const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});


const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  });
  
  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  Page.belongsTo(User)
  User.hasMany(Page)

  
   
  
  function toSlug(title){
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.beforeValidate((userInstance, optionsObject) => {
  console.log("something")
  if(userInstance.title){
  userInstance.slug = toSlug(userInstance.title)
  } else {
    console.log("DOOMED!")
  }

})
  
  module.exports = { db, Page, User };