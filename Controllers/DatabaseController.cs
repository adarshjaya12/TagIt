using System;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using TagIt.Interface.Repository;
using TagIt.Interface.Service;

namespace TagIt.Controllers
{
    public class TagModel
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string TagType { get; set; }
    }
    [Route("api/database/")]
    public class DatabaseController : Controller
    {
        ITagRepository TagRepository { get; set; }
        IImageService ImageService { get; set; }
        public DatabaseController(ITagRepository tagRepository, IImageService imageService)
        {
            TagRepository = tagRepository;
            ImageService = imageService;
        }
        
        [HttpGet("GetTags")]
        public JsonResult Get()
        {
            var result = TagRepository.GetTagByMember();
            return new JsonResult(result);
        }

        [HttpGet("GetTitle")]
        public JsonResult GetTitleByUrl(string Url)
        {
            try
            {
                bool isUri = Uri.IsWellFormedUriString(Url, UriKind.RelativeOrAbsolute);
                if(isUri)
                {
                    using (WebClient client = new WebClient())
                    {
                        string htmlCode = client.DownloadString(Url);
                        string title = Regex.Match(htmlCode, @"\<title\b[^>]*\>\s*(?<Title>[\s\S]*?)\</title\>", RegexOptions.IgnoreCase).Groups["Title"].Value;
                        return new JsonResult(title);
                    }
                }
            }
            catch(Exception ex)
            {
            }
            return new JsonResult(string.Empty);
        }

        [HttpPost("AddTag")]
        public JsonResult AddTag([FromBody] TagModel model)
        {
            if (model.Url == null || model.Title == null)
                return new JsonResult(false);
            TagRepository.CreateTag(model.Url, "", model.TagType, model.Title);
            return new JsonResult(true);
        }

        [HttpGet("DeleteTag")]
        public JsonResult DeleteTag(Guid id)
        {
            TagRepository.DeleteTag(id);
            return new JsonResult(true);
        }

        [HttpPost("UpdateTag")]
        public JsonResult UpdateTag([FromBody] TagModel model)
        {
            TagRepository.UpdateTag(model.Id, model.Url, "", model.TagType, model.Title);
            return new JsonResult(true);
        }

    }
}
