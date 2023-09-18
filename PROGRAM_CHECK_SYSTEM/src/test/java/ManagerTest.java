import ru.doctorixx.core.ExecutionManager;
import ru.doctorixx.core.executors.CommandExecutor;
import ru.doctorixx.core.executors.KumirExecutor;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ManagerTest {

    public static String PROGRAMM = "алг\nнач\nцел ц, а\nввод ц, а\nвывод ц + а\nкон\n";

    public static void main(String[] args) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\jebpi\\IdeaProjects\\TestProject\\progs\\main.kum"))) {
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();

            while (line != null) {
                sb.append(line);
                sb.append(System.lineSeparator());
                line = br.readLine();
            }
            PROGRAMM = sb.toString();
        }


        for (int i = 0; i < 15; i++) {
            CommandExecutor executor = new KumirExecutor("main.kum", "adir");
            ExecutionManager executionManager = new ExecutionManager(executor, "1\n3", PROGRAMM);
//            new Thread(executionManager).start();
        }
    }
}
