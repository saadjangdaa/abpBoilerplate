using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace firstboilerplate.Localization
{
    public static class firstboilerplateLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(firstboilerplateConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(firstboilerplateLocalizationConfigurer).GetAssembly(),
                        "firstboilerplate.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
