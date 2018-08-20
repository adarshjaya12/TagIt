using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TagIt.DataObject;
using TagIt.DBContext;
using TagIt.Interface.Service;

namespace TagIt.Implementation.Service
{
    public class DBService : IDBService
    {

        private TagItDBContext DatabaseObject
        {
            get { return new TagItDBContext(); }
        }

        public List<TagBlock> GetTags(int memberId)
        {
            var memberTags = DatabaseObject.TagBlock.Where(tg => tg.MemberId == memberId).ToList();
            return memberTags;
        }


        public void AddNewTag(int memberId,string Url,string ImageUrl,string tagType,string siteTitle)
        {
            var block = TagBlock(null,memberId, Url, ImageUrl, tagType, siteTitle);
            using (TagItDBContext dbContext = new TagItDBContext())
            {
                dbContext.TagBlock.Add(block);
                dbContext.SaveChanges();
            }
        }

        private TagBlock TagBlock(TagBlock tagBlock,int memberId, string Url, string ImageUrl, string tagType, string siteTitle)
        {
            TagBlock block;
            if (tagBlock == null)
                block = new TagBlock();
            else
                block = tagBlock;
            block.MemberId = memberId;
            block.Url = Url;
            block.SiteImageUrl = ImageUrl;
            block.TagType = tagType;
            block.SiteTitle = siteTitle;
            return block;
        }

        public void DeleteTag(int memberId,Guid tagId)
        {
            var tagBlock = DatabaseObject.TagBlock.FirstOrDefault(blk => blk.Id == tagId && blk.MemberId == memberId);
            if (tagBlock != null)
            {
                using (TagItDBContext dbContext = new TagItDBContext())
                {
                    dbContext.TagBlock.Remove(tagBlock);
                    dbContext.SaveChanges();
                }
                
            }
        }

        public void UpdateTag(Guid id,int memberId, string Url, string ImageUrl, string tagType, string siteTitle)
        {
            var tagBlock = DatabaseObject.TagBlock.FirstOrDefault(blk => blk.Id == id && blk.MemberId == memberId);
            var block = TagBlock(tagBlock,memberId, Url, ImageUrl, tagType, siteTitle);
            using (TagItDBContext dbContext = new TagItDBContext())
            {
                dbContext.TagBlock.Update(block);
                dbContext.SaveChanges();
            }
        }
    }
}
