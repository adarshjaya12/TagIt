using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TagIt.DataObject;

namespace TagIt.Interface.Repository
{
    public interface ITagRepository
    {
        List<TagBlock> GetTagByMember();

        void CreateTag(string Url, string ImageUrl, string tagType, string siteTitle);

        void UpdateTag(Guid id,string Url, string ImageUrl, string tagType, string siteTitle);

        void DeleteTag(Guid guid);
    }
}
