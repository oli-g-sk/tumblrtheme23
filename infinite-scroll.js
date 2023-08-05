const postsPerPage = 14;
const htmlPostContainer = "#photostream"

var isLoading = false;
var currentPage = 1;

$(window).on("scroll", function() {
  if (!isLoading && $(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
    isLoading = true;
    loadMorePosts();
  }
});

function loadMorePosts() {
  $.ajax({
    url: "/api/read/json",
    dataType: "jsonp",
    data: {
      type: "photo",
      start: currentPage * postsPerPage,
    },
    success: function(data) {
      isLoading = false;
      if (data.posts.length > 0) {
        currentPage++;
        appendPosts(data.posts);
      }
    },
    error: function() {
      isLoading = false;
    }
  });
}

function appendPosts(posts) {
  var postContainer = $(htmlPostContainer);
  $.each(posts, function(index, post) {
    postContainer.append("<div class='post'>" + post["photo-url-1280"] + "</div>");
  });
}