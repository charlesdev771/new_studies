import java.io.IOException;

public class MyPP {
    @SuppressWarnings("deprecation")
    public static void main(String[] args) {
        try {
            Runtime.getRuntime().exec("cmd /c dir");  // No Windows, use "cmd /c dir"
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
