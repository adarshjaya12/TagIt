using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TagIt.DataObject;

namespace TagIt.Interface.Service
{
    public interface IDBService
    {
        List<TagBlock> GetTags(int memberId);

        void AddNewTag(int memberId, string Url, string ImageUrl, string tagType, string siteTitle);

        void DeleteTag(int memberId, Guid tagId);

        void UpdateTag(Guid id, int memberId, string Url, string ImageUrl, string tagType, string siteTitle);
    }
}
