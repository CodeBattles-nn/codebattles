package ru.doctorixx.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.doctorixx.Env;
import ru.doctorixx.api.structures.APIRequest;
import ru.doctorixx.api.structures.ApiResponse;
import ru.doctorixx.core.ExecutionManager;
import ru.doctorixx.core.RunManager;
import ru.doctorixx.core.structures.ProgramResult;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Level;

public class APIHandler implements Handler {

    private static final Logger log = LoggerFactory.getLogger(APIHandler.class.getName());

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    private final ExecutorsFactory factory = new ExecutorsFactory();

    private final ExecutorService threadPool = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

    @Override
    public void handle(@NotNull Context context) {

        APIRequest request = context.bodyAsClass(APIRequest.class);

        Runnable task = () -> {
            try {
                ExecutionManager executionManager = new ExecutionManager(factory.get(request.compiler()), "", request.source());
                RunManager runManager = new RunManager(executionManager);

                List<ProgramResult> results = runManager.test(request.tests());

                OkHttpClient client = new OkHttpClient();
                ObjectMapper objectMapper = new ObjectMapper();

                ApiResponse response = new ApiResponse(results, request.meta());
                RequestBody requestBody = RequestBody.create(JSON, objectMapper.writeValueAsString(response));

                Request senderRequest = new Request.Builder()
                        .url(Env.get(Env.EnvVars.SERVER_ENDPOINT))
                        .post(requestBody)
                        .build();

                client.newCall(senderRequest).execute();
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        };

        threadPool.execute(task);

        context.result("OK");
    }
}
