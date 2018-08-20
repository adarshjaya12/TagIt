using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TagIt.DataObject;
using TagIt.Interface.Repository;
using TagIt.Interface.Service;

namespace TagIt.Implementation.Repository
{
    public class TagRepository : ITagRepository
    {

        int UserId
        {
            get { return 12345; }
        }

        protected IDBService DBService { get; set; }
        public TagRepository(IDBService dBService)
        {
            DBService = dBService;
        }

        public List<TagBlock> GetTagByMember()
        {
            return DBService.GetTags(UserId);
        }

        public void CreateTag(string Url, string ImageUrl, string tagType, string siteTitle)
        {
            DBService.AddNewTag(UserId, Url, ImageUrl, tagType, siteTitle);
        }

        public void UpdateTag(Guid id,string Url, string ImageUrl, string tagType, string siteTitle)
        {
            DBService.UpdateTag(id,UserId, Url, ImageUrl, tagType, siteTitle);
        }

        public void DeleteTag(Guid guid)
        {
            DBService.DeleteTag(UserId, guid);
        }
    }
}
