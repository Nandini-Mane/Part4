const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // Use the reduce method to sum the 'likes' property of all blog objects.
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes // <--- Make sure totalLikes is exported
}