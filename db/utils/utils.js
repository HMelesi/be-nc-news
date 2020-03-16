exports.formatDates = list => {
  const newList = [...list];
  const finalList = newList.map(item => {
    const newItem = Object.assign({}, item);
    newItem["created_at"] = new Date(newItem["created_at"]);
    return newItem;
  });
  return finalList;
};

exports.makeRefObj = list => {
  const refObj = {};
  if (list.length === 0) return refObj;
  list.forEach(item => (refObj[item["title"]] = item["article_id"]));
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  if (comments.length === 0 || articleRef === undefined) return [];
  const newComments = [...comments];
  const returnComments = newComments.map(item => {
    let newItem = { ...item };
    newItem["article_id"] = articleRef[newItem["belongs_to"]];
    delete newItem["belongs_to"];
    newItem["author"] = newItem["created_by"];
    delete newItem["created_by"];
    newItem["created_at"] = new Date(newItem["created_at"]);
    return newItem;
  });
  return returnComments;
};
