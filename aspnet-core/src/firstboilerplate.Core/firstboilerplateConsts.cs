using firstboilerplate.Debugging;

namespace firstboilerplate
{
    public class firstboilerplateConsts
    {
        public const string LocalizationSourceName = "firstboilerplate";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "8c5c9295e7304e548776a2b0429bfed8";
    }
}
