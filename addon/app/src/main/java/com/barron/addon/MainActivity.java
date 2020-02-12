package com.barron.addon;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init_pull();
    }

    public void init_pull() {

        Button simplebutton = findViewById(R.id.button);
        simplebutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new GetUrlContentTask().execute("starting.");

            }
        });
    }

    public class GetUrlContentTask extends AsyncTask<String, Integer, String> {
        protected String doInBackground(String... urls) {
            try {

                URL url = new URL("http://bigpara.hurriyet.com.tr/api/v1/hisse/list");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();

                InputStream in = new BufferedInputStream(connection.getInputStream());
                String content = inputStreamToString(in);
                return content;

            } catch (Exception a) {

                return "connection error" + a.toString();
            }

        }

        protected void onProgressUpdate(Integer... progress) {
        }

        protected void onPostExecute(String result) {
            // this is executed on the main thread after the process is over
            // update your UI here

            TextView resulttext = findViewById(R.id.textView);
            resulttext.setText(result);

            Intent resultIntent = new Intent();
// TODO Add extras or a data URI to this intent as appropriate.
            resultIntent.putExtra("hisseler", result);
            setResult(Activity.RESULT_OK, resultIntent);
            finish();

        }

        private String inputStreamToString(InputStream is) {
            String rLine = "";
            StringBuilder answer = new StringBuilder();

            InputStreamReader isr = new InputStreamReader(is);

            BufferedReader rd = new BufferedReader(isr);

            try {
                while ((rLine = rd.readLine()) != null) {
                    answer.append(rLine);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return answer.toString();
        }
    }
}
