using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TagIt.DataObject;

namespace TagIt.Interface.Service
{
    public interface IImageService
    {
        string GetScreenShot(string url);

    }
}
