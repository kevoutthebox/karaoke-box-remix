const mongoose = require("mongoose");
const Song = require("./models/songmodel");
const Comment = require("./models/commentmodel");
const UserSR = require("./models/songreview-usermodel");


function seedDB() {

  UserSR.remove({}, (err) => {
    console.log("user removed")

    const seedUserData = new UserSR({ username: 'jonnhart' });
    UserSR.register(seedUserData, 'password', (err, savedUser) => {
      if(err) {
        console.log(err);
      }
        console.log("user saved");
        //remove songs collection
        Comment.remove({}, (err) => {
          console.log('comments removed')

          const seedSongData = [
            {
              name: 'Together',
              artist: 'Taylor Swift',
              image: 'https://upload.wikimedia.org/wikipedia/en/4/40/We_Are_Never_Ever_Getting_Back_Together.png',
              description: 'We Are Never Ever Getting Back Together" is a song recorded by American singer-songwriter Taylor Swift for her fourth studio album, Red (2012). Swift co-wrote the song with its producers, Max Martin and Shellback. The song was released as the lead single from Red on August 13, 2012, by Big Machine Records.',
              author: {id: savedUser._id, username: savedUser.username,},
            },
            {
              name: 'Closer',
              artist: 'Chainsmokeres',
              image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png',
              description: '"Closer" is a song by American DJ duo The Chainsmokers, featuring American singer Halsey. Andrew Taggart (one half of The Chainsmokers) also provides his vocals in the song.[2] It was released on July 29, 2016 by Disruptor and Columbia Records.',
              author: {id: savedUser._id, username: savedUser.username,},
            },
            {
              name: 'This is what you came for',
              artist: 'Rihanna',
              image: 'https://upload.wikimedia.org/wikipedia/en/a/a8/This_Is_What_You_Came_For_cover.png',
              description: '"This Is What You Came For" is a song by Scottish DJ and record producer Calvin Harris, featuring Barbadian singer Rihanna. The song was released on 29 April 2016 through Sony Music and Westbury Road. Featuring influences of house music, Harris co-wrote the song with Taylor Swift',
              author: {id: savedUser._id, username: savedUser.username,},
            },
            {
              name: 'No Limit',
              artist: 'Usher',
              image: 'https://upload.wikimedia.org/wikipedia/en/6/61/No_Limit_Single.jpg',
              description: '"No Limit" is a song by American singer Usher, featuring American rapper Young Thug. It was released by RCA on June 9, 2016, for online streaming through the streaming service Tidal, which Usher co-owns. The following day it was released for paid purchase on other digital download and online streaming services."No Limit" serves as the lead single off his eighth studio album, Hard II Love. ',
              author: {id: savedUser._id, username: savedUser.username,},
            },
            {
              name: 'Controlla',
              artist: 'Drake',
              image: 'https://upload.wikimedia.org/wikipedia/en/6/62/Controlladrake.1.png',
              description: '"Controlla" is a song by Canadian rapper Drake, recorded for his studio album Views. The song was released as the fourth single from the album in the US on June 7, 2016.[1] The track was written by Drake, Matthew Samuels, Dwayne Chin-Quee, Stephen McGregor, Moses Davis, Donald Dennis, Gary Jackson, Patrick Roberts, Andrew Thomas, and produced by Boi-1da, Supa Dups, Di Genius, TheFinal1 and Allen Ritter. It reached number 27 in Canada, number 18 in the UK, and number 16 on the US Billboard Hot 100.',
              author: {id: savedUser._id, username: savedUser.username,},
            },
          ];

          Song.remove({}, (err) => {
            if (err) {
              console.log(err);
            }
            console.log("song collection removed");
            //add a few Songs to DB
            seedSongData.forEach((seed) => {

              Song.create(seed, (err, song) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("song added")
                  //adding comments
                  Comment.create(
                    {
                      text: 'great song',
                      author: {id: savedUser._id, username: savedUser.username,},
                    }, (err, comment) => {
                      if(err){
                        console.log(err);
                      } else {
                        song.comments.push(comment);
                        song.save();
                      }
                    });
                }
              });
            });
          });
        });
    });
  });



}

module.exports = seedDB;
