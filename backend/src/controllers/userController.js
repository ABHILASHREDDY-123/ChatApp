const Users = require("../schemas/userSchema");
const Groups = require("../schemas/groupSchema");
const PrivateRecents = require("../schemas/privateRecentSchema");
const GroupMembers = require("../schemas/groupMemSchema");

const searchUser = async (req, res) => {
  try {
    const name = req.params.user;
    const regex = new RegExp(name, 'i');
    const results = await Users.find({ name: { $regex: regex } }).select("-password");
    const results2 = await Groups.find({ name: { $regex: regex } });
    console.log(results);
    res.send({ payload: [...results, ...results2], err: 0 });
  } catch (err) {
    console.log(err);
    res.send({ error: err.message, err: 1 });
  }
};

function mergeSortedArrays(arr1, arr2) {
  const mergedArray = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i].updatedAt > arr2[j].updatedAt) {
      mergedArray.push(arr1[i]);
      i++;
    } else {
      mergedArray.push(arr2[j]);
      j++;
    }
  }

  // Push remaining elements of arr1, if any
  while (i < arr1.length) {
    mergedArray.push(arr1[i]);
    i++;
  }

  // Push remaining elements of arr2, if any
  while (j < arr2.length) {
    mergedArray.push(arr2[j]);
    j++;
  }

  return mergedArray;
}

const getUserData = async (req, res) => {
  try {
    const user_id = req.user._id;
    const results = await PrivateRecents.find({
      $or: [
        { user1: user_id },
        { user2: user_id }
      ]
    }).sort({ updatedAt: -1 }).populate({
      path: "user1",
      select: "-password"
    }).populate({
      path: "user2",
      select: "-password"
    });

    const results1 = await GroupMembers.find({ user: user_id }).sort({ updatedAt: -1 }).populate("group");
    console.log(results1);
    const mergedResults = mergeSortedArrays(results, results1);
    console.log("merged ", mergedResults)
    let users = mergedResults.map((r) => {
      if (r.user1) {
        if (r.user1._id == user_id) {
          return r.user2;
        } else {
          return r.user1;
        }
      }
      else {
        return r.group;
      }
    });
    console.log(users);
    res.send({ message: "Succesfully Got Users", payload: users, err: 0 });
  }
  catch (err) {
    console.log(err);
    res.send({ error: err.message, err: 1 });
  }
};
module.exports = { getUserData, searchUser };
