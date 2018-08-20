using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TagIt.DataObject
{
    public class TagBlock
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public int MemberId { get; set; }

        public string Url { get; set; }

        public string SiteTitle { get; set; }

        public string SiteImageUrl { get; set; }

        public string TagType { get; set; }
    }
}
