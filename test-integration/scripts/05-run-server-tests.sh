#!/bin/bash

set -e
if [[ -a $(dirname $0)/00-init-env.sh ]]; then
    source $(dirname $0)/00-init-env.sh
else
    echo "*** 00-init-env.sh not found, relying on JHI_* en vars"
fi

#-------------------------------------------------------------------------------
# Run server test
#-------------------------------------------------------------------------------
cd "$JHI_FOLDER_APP"
if [ -f "mvnw" ]; then
    ./mvnw -ntp verify --batch-mode
        # -Dlogging.level.ROOT=OFF \
        # -Dlogging.level.org.zalando=OFF \
        # -Dlogging.level.io.github.jhipster=OFF \
        # -Dlogging.level.io.github.jhipster.sample=OFF \
        # -Dlogging.level.org.springframework=OFF \
        # -Dlogging.level.org.springframework.web=OFF \
        # -Dlogging.level.org.springframework.security=OFF
    mv target/*.jar app.jar
elif [ -f "gradlew" ]; then
    ./gradlew test integrationTest
        # -Dlogging.level.ROOT=OFF \
        # -Dlogging.level.org.zalando=OFF \
        # -Dlogging.level.io.github.jhipster=OFF \
        # -Dlogging.level.io.github.jhipster.sample=OFF \
        # -Dlogging.level.org.springframework=OFF \
        # -Dlogging.level.org.springframework.web=OFF \
        # -Dlogging.level.org.springframework.security=OFF
    mv build/libs/*SNAPSHOT.jar app.jar
fi
