const postsPerPage = 14;
const htmlPostContainer = "#photostream"

var isLoading = false;
var currentPage = 1;

function getPostTemplate(photoUrl500, photoUrlFull) {
  var result = "<div class=\"photo\">";
  result += "<a class=\"lightbox-link\" href=\"#\" data-image-url=\"";
  result += photoUrlFull;
  result += "\">";
  result += "<img src=\"";
  result += photoUrl500;
  result += "\"/>";
  result += "</a></div>";
  return result;
}

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
    var template = getPostTemplate(post["photo-url-500"], post["photo-url-1280"]);
    postContainer.append(template);
  });
}