import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zvnpluafwmsxgqimngmk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bnBsdWFmd21zeGdxaW1uZ21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzcxMzcsImV4cCI6MjAyNTQxMzEzN30.IvL2RtoQKKp4GUbnzHj8WhnIck_JnowJRqAdmQ3QtPw";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabaseUrl };

export default supabase;
